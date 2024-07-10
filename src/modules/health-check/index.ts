import express, { Router } from "express";
import fs from "fs";
import path from "path";
const health = Router();

health.get("/health", (req, res) => {
  try {
    res.status(200).send("Hello World");
  } catch (error) {
    res.status(500).send(`Dependency ${error.message} not found`);
  }
});

export { health };
