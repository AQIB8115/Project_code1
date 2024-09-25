const PcModel = require('../Models/pc');

exports.createPc = async (req, res) => {
    try {
        const { PcID, location, status } = req.body;

        if (!PcID) {
            return res.status(400).json({ error: 'PcID is required' });
        }

        const newPc = new PcModel({ PcID, location, status });
        await newPc.save();
        res.status(201).json({ message: 'PC successfully created'
        });
    } catch (error) {
        res.status(400).json({ error: 'Unable to create PC', details: error });
    }
};
exports.getAllPcs = async (req, res) => {
    try {
        const pcs = await PcModel.find();
        res.status(200).json(pcs);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
exports.getPcById = async (req, res) => {
    try {
        const pc = await PcModel.findById(req.params.id);
        if (!pc) {
            return res.status(404).json({ error: 'PC not found' });
        }
        res.status(200).json(pc);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch PC', details: error });
    }
};
exports.updatePc = async (req, res) => {
    try {
        const updatedPc = await PcModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPc) {
            return res.status(404).json({ error: 'PC not found' });
        }
        res.status(200).json({ message: 'PC successfully updated', pc: updatedPc });
    } catch (error) {
        res.status(400).json({ error: 'Unable to update PC', details: error });
    }
};
exports.deletePc = async (req, res) => {
    try {
        const deletedPc = await PcModel.findByIdAndDelete(req.params.id);
        if (!deletedPc) {
            return res.status(404).json({ error: 'PC not found' });
        }
        res.status(200).json({ message: 'PC successfully deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Unable to delete PC', details: error });
    }
};
