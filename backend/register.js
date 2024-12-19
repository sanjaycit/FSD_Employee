import db from "./db.js";

export const addEmployee = (req, res) => {
  try {
    const {
      firstName,
      lastName,
      empID,
      email,
      phoneNumber,
      department,
      date_of_join,
      role,
    } = req.body;

    // Check if employee ID or email already exists
    db.query(
      "SELECT empID, email FROM employee WHERE empID = ? OR email = ?",
      [empID, email],
      (err, results) => {
        if (err) {
          console.log(err.message);
          return res.status(500).json({ message: "Error checking duplicates" });
        }
       // [{email:}]??
        // Check if a duplicate was found
        if (results.length > 0) {
          const duplicateField = results[0].email === email ? "email" : "empID";
          return res
            .status(400)
            .json({
              field: duplicateField,
              message: `${duplicateField} already exists`,
            });
        }

        // Insert the new employee into the database
        db.query(
          "INSERT INTO employee (first_name, last_name, empID, email, phoneNumber, department, date_of_join, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
          [
            firstName,
            lastName,
            empID,
            email,
            phoneNumber,
            department,
            date_of_join,
            role,
          ],
          (err, results) => {
            if (err) {
              console.log(err.message);
              return res.status(500).json({ message: "Error adding employee" });
            }
            console.log(results);
            return res
              .status(201)
              .json({ message: "Employee added successfully" });
          }
        );
      }
    );
  } catch (error) {
    console.error("Error in addEmployee:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
