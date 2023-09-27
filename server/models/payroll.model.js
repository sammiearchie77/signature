const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const payrollSchema = new Schema(
   {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    startDate: Date,
    endDate: Date,
    totalHoursWorked: Number,
    earnings: Number,
    deductions: Number,
    netPay: Number,
   },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("payrolls", payrollSchema);