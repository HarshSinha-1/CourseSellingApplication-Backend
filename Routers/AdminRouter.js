const { Router } = require("express");
const { adminmodel, coursemodel, purchasemodel } = require('../Models/db');
const adminmiddleware = require("../middleware/admin");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { JWT_ADMIN_PASSWORD } = require('../config/config');

const AdminRouter = Router();

AdminRouter.post("/signup", async function (req, res) {
    try {
        const { email, firstname, lastname, password } = req.body;
        const hashpwd = await bcrypt.hashSync(password, 10);

        await adminmodel.create({
            email,
            firstname,
            lastname,
            hashpwd
        });
        res.json({
            message: "Admin login"
        });
    } catch (error) {
        res.json({
            message: "Some error occurred!",
            error: error.message
        });
    }
});

AdminRouter.post("/login", async function (req, res) {
    try {
        const { email, password } = req.body;
        const admin = await adminmodel.findOne({ email: email });

        const matchpwd = await bcrypt.compare(password, admin.hashpwd);

        if (admin && matchpwd) {
            const token = await jwt.sign({ id: admin._id }, JWT_ADMIN_PASSWORD);
            res.json({ token: token });
        } else {
            res.status(403).json({ message: 'Incorrect Credential!' });
        }
    } catch (error) {
        res.json({ error: error.message });
    }
});

AdminRouter.post("/Course", adminmiddleware, async function (req, res) {
    try {
        const adminId = req.userId;
        const { title, description, imageUrl, price } = req.body;
        const course = await coursemodel.create({
            title: title,
            description: description,
            imageUrl: imageUrl,
            price: price,
            creatorId: adminId
        });
        res.json({
            message: "Course created by admin",
            courseId: course._id
        });
    } catch (err) {
        res.json({ err: err.message });
    }
});

AdminRouter.put("/Update/Courses", adminmiddleware, async function (req, res) {
    try {
        const adminId = req.body.userId;
        const courseId = req.body.courseId;
        const { title, description, imageUrl, price } = req.body;

        await coursemodel.updateOne({
            adminId: adminId,
            courseId: courseId
        }, {
            title: title,
            description: description,
            imageUrl: imageUrl,
            price: price
        });
        res.json({ message: "Course Updated" });
    } catch (err) {
        res.json({ err: err.message });
    }
});

AdminRouter.get("/bulkCourses", adminmiddleware, async function (req, res) {
    try {
        const adminId = req.userId;
        const courses = await coursemodel.find({ adminId: adminId });

        res.json({
            message: "All courses",
            courses
        });
    } catch (error) {
        res.json({ err: error.message });
    }
});

module.exports = AdminRouter;
