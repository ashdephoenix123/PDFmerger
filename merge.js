const PDFMerger = require('pdf-merger-js');


const mergePDF = async (p1, p2) => {
    
    let merger = new PDFMerger();
    let d = new Date().getTime();
    await merger.add(p1);  //merge all pages. parameter is the path to file and filename.
    await merger.add(p2); // merge only page 2

    await merger.save(`static/${d}.pdf`); //save under given name and reset the internal document

    return d;
};

module.exports = { mergePDF }
