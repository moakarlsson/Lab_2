import express from "express";
import db from "../db/connection.js";
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const[rows] = await db.query("SELECT * FROM tasks");
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const[rows] = await db.query("SELECT * FROM tasks WHERE id = ?", [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: "Task was not found" });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post("/", async (req,res) => {
    const { title, description, status, user_id } = req.body;
    try {
        const [result] = await db.query("INSERT INTO tasks (title, description, status, user_id) VALUES (?,?,?,?)" , [title, description, status, user_id]);
        res.status(201).json({
            message: "Task created",
            insertId : result.insertId
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
})

router.put("/:id", async (req,res) => {
    const taskId = req.params.id;
    const { title, description, status, user_id} = req.body;
    
    if (!title || !description || !status || !user_id) {
        return res.status(400).json({ message: "Missing required fields!" });
    }

    try {
        const [result] = await db.query(
            "UPDATE tasks SET title = ?, description = ?, status = ?, user_id = ? WHERE id = ?",
            [title, description, status, user_id, taskId]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: `Task with ${taskId} not found` });
        }
        res.status(200).json({
            message: "Task updated", 
            taskId
        });
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.delete("/:id", async (req, res) =>{
    const taskId = req.params.id;
    
    try {
        const [result] = await db.query(
            "DELETE FROM tasks WHERE id = ?",
            [taskId]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: `Task with ${taskId} not found` });
        }
        res.status(200).json({
            message: "Task deleted successfully!"});
    } catch (err) {
        console.log(err);
        res.status(500).json( { error: "Internal server error" });
    }
})

export default router;