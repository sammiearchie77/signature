const Payroll = require('../models/payroll.model');
const CustomError = require('../utils/customError');

class PayrollService {
    async create(data) {
        return await new Payroll(data).save();
    }

    async getAll() {
        return await Payroll.find();
    }

    async getOne(payrollId) {
        const payroll = await Payroll.findOne({ _id: payrollId });
        if (!payroll) throw new CustomError("Payroll does not exist")

        return payroll;
    }

    async update(payrollId, data) {
        const payroll = await Payroll.findByIdAndUpdate(
            { _id: payrollId },
            { $set: data },
            { new: true }
        );
        if (!payroll) throw new CustomError("Payroll doesn't exist", 400);

        return payroll;
    }

    async delete(payrollId) {
        const payroll = await Payroll.deleteOne({ _id: payrollId });
        if (!payroll) throw new CustomError("Payroll does not exist")
        return payroll;
    }
}

module.exports = new PayrollService();