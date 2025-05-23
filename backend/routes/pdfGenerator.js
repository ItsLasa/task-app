// backend/routes/pdfGenerator.js
const express = require("express");
const PDFDocument = require("pdfkit");
const router = express.Router();

router.post("/generate-task-pdf", (req, res) => {
  const task = req.body.task; // one task object

  if (!task) {
    return res.status(400).send("Task data is required.");
  }

  const doc = new PDFDocument();
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename=task_${task._id}.pdf`);

  doc.pipe(res);
  doc.fontSize(18).text("Task Details", { align: "center" });
  doc.moveDown();

  doc.fontSize(12).text(`Title: ${task.title}`);
  doc.text(`Description: ${task.description}`);
  doc.text(`Assigned To: ${task.assigned}`);
  doc.text(`Status: ${task.status}`);
  doc.text(`Deadline: ${task.deadline ? new Date(task.deadline).toLocaleString() : "No deadline"}`);

  doc.end();
});

module.exports = router;
