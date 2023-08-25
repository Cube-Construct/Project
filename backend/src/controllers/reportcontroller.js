const Student = require("../models/student");
const Company = require("../models/company");
const trycatch = require("../error/errorhandler").trycatch;
const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');


// ------------ POST REQUEST : /verification/report ------------ //

exports.createReport = trycatch(async (req, res) => {

    const startDate = req.body.startDate;
    const endDate = req.body.endDate;

    
    let companies = await Company.find({
        createdAt: {
            $gte: new Date(startDate), $lte: new Date(endDate)
        }
    });

    let students = await Student.find({
        createdAt: {
            $gte: new Date(startDate), $lte: new Date(endDate)
        }
    });

    var data = [];
    for (let i = 0; i < companies.length; i++) {
        const students = await Student.find({ unqId: companies[i]._id });
        data.push({
            "Company Name": companies[i].orgName,
            "Company Email": companies[i].orgEmail,
            "Date of Application": new Date(companies[i].createdAt).toISOString().slice(0, 10),
            "Transaction ID": "1234567890",

            "Students": students.map((student) => {
                return {
                    "Student Name": student.name,
                    "Student PRN": student.prn,
                };
            }),
        });
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Report Sheet');

    worksheet.columns = [
        { header: 'Company Name', key: 'companyName', width: 30 },
        { header: 'Company Email', key: 'companyEmail', width: 30 },
        { header: 'Date of Application', key: 'dateOfApplication', width: 30 },
        { header: 'Transaction ID', key: 'transactionID', width: 30 },
        { header: 'Student Name', key: 'studentName', width: 30 },
        { header: 'Student PRN', key: 'studentPRN', width: 30 },
    ];
    // style for header
    worksheet.getRow(1).font = { bold: true };
    worksheet.getColumn(1).alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getColumn(2).alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getColumn(3).alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getColumn(4).alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getColumn(5).alignment = { vertical: "middle", horizontal: "left" };
    worksheet.getColumn(6).alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getRow(1).alignment = { vertical: "middle", horizontal: "center" };

    // give border to header
    worksheet.getCell('A1').border = { top: { style: "thin" }, bottom: { style: "thin" }, left: { style: "thin" }, right: { style: "thin" } };
    worksheet.getCell('B1').border = { top: { style: "thin" }, bottom: { style: "thin" }, left: { style: "thin" }, right: { style: "thin" } };
    worksheet.getCell('C1').border = { top: { style: "thin" }, bottom: { style: "thin" }, left: { style: "thin" }, right: { style: "thin" } };
    worksheet.getCell('D1').border = { top: { style: "thin" }, bottom: { style: "thin" }, left: { style: "thin" }, right: { style: "thin" } };
    worksheet.getCell('E1').border = { top: { style: "thin" }, bottom: { style: "thin" }, left: { style: "thin" }, right: { style: "thin" } };
    worksheet.getCell('F1').border = { top: { style: "thin" }, bottom: { style: "thin" }, left: { style: "thin" }, right: { style: "thin" } };


    var lastStudentRow = 2;
    var lastBorderRow = 2;

    for (let i = 0; i < data.length; i++) {
        const company = data[i];
        const company_name = company["Company Name"];
        const company_email = company["Company Email"];
        const dateOfApplication = company["Date of Application"];
        const transactionID = company["Transaction ID"];
        const students = company["Students"];
        for (let j = 0; j < students.length; j++) {
            const student = students[j];
            const student_name = student["Student Name"];
            const student_prn = student["Student PRN"];
            worksheet.addRow({
                companyName: company_name,
                companyEmail: company_email,
                dateOfApplication: dateOfApplication,
                transactionID: transactionID,
                studentName: student_name,
                studentPRN: student_prn
            });
            // give border
            if (j == students.length - 1) {
                worksheet.getCell(`A${lastStudentRow}`).border = { bottom: { style: "medium" }, left: { style: "medium" }, right: { style: "thin" } };
                worksheet.getCell(`B${lastStudentRow}`).border = { bottom: { style: "medium" }, left: { style: "thin" }, right: { style: "thin" } };
                worksheet.getCell(`C${lastStudentRow}`).border = { bottom: { style: "medium" }, left: { style: "thin" }, right: { style: "thin" } };
                worksheet.getCell(`D${lastStudentRow}`).border = { bottom: { style: "medium" }, left: { style: "thin" }, right: { style: "thin" } };
                worksheet.getCell(`E${lastBorderRow}`).border = { bottom: { style: "medium" }, left: { style: "thin" }, right: { style: "thin" } };
                worksheet.getCell(`F${lastBorderRow}`).border = { bottom: { style: "medium" }, left: { style: "thin" }, right: { style: "medium" } };
            } else {
                worksheet.getCell(`A${lastBorderRow}`).border = { bottom: { style: "thin" }, left: { style: "medium" }, right: { style: "thin" } };
                worksheet.getCell(`B${lastBorderRow}`).border = { bottom: { style: "thin" }, left: { style: "thin" }, right: { style: "thin" } };
                worksheet.getCell(`C${lastBorderRow}`).border = { bottom: { style: "thin" }, left: { style: "thin" }, right: { style: "thin" } };
                worksheet.getCell(`D${lastBorderRow}`).border = { bottom: { style: "thin" }, left: { style: "thin" }, right: { style: "thin" } };
                worksheet.getCell(`E${lastBorderRow}`).border = { bottom: { style: "thin" }, left: { style: "thin" }, right: { style: "thin" } };
                worksheet.getCell(`F${lastBorderRow}`).border = { bottom: { style: "thin" }, left: { style: "thin" }, right: { style: "medium" } };
            }
            lastBorderRow++;

        }
        // merge cells for company name and company email
        worksheet.mergeCells(`A${lastStudentRow}:A${lastStudentRow + students.length - 1}`);
        worksheet.mergeCells(`B${lastStudentRow}:B${lastStudentRow + students.length - 1}`);
        worksheet.mergeCells(`C${lastStudentRow}:C${lastStudentRow + students.length - 1}`);
        worksheet.mergeCells(`D${lastStudentRow}:D${lastStudentRow + students.length - 1}`);
        worksheet.getCell(`A${lastStudentRow}`).alignment = { vertical: "middle", horizontal: "left" };
        worksheet.getCell(`B${lastStudentRow}`).alignment = { vertical: "middle", horizontal: "left" };
        worksheet.getCell(`A${lastStudentRow}`).font = { bold: true };
        lastStudentRow += students.length;
    }

    // delete all previous files
    const directory = './src/public/reports';
    fs.readdir(directory, (err, files) => {
        if (err) throw err;
        for (const file of files) {
            fs.unlink(path.join(directory, file), err => {
                if (err) throw err;
            });
        }
    });
    
    // save file
    const fileName = `Report-${new Date().getTime()}.xlsx`;
    await workbook.xlsx.writeFile(`./src/public/reports/${fileName}`);

    res.status(200).json({
        status: "success",
        message: "Report created successfully",
        fileName: fileName
    });
});