import Tour from "../model/Tour.js";

export const addTour = async (req, res) => {
  try {
    if (req.file) {
      req.body.photo = req.file.filename;

      const user = await Tour.create({ ...req.body });
      await user.save();

      return res.status(201).json(user);
    } else {
      const user = await Tour.create({ ...req.body });
      await user.save();

      return res.status(201).json(user);
    }
  } catch (error) {
    res.status(500).send({ error: error });
  }
};

export const getTours = async (req, res) => {
  try {
    const data = await Tour.find().sort({ createdAt: 1 });
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ error: error });
  }
};

export const getTourById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Tour.findById(id);
    res.status(200).send(data);
  } catch (error) {
    res.status(200).send({ error: error });
  }
};

export const updateTour = async (req, res) => {
  try {
    const id = req.params.id;
    if (req.file) {
      req.body.photo = req.file.filename;
      const data = await Tour.findByIdAndUpdate(id, req.body, { new: true });
      return res.status(200).send(data);
    } else {
      const data = await Tour.findByIdAndUpdate(id, req.body, { new: true });
      return res.status(200).send(data);
    }
  } catch (error) {
    res.status(500).send({ error: error });
  }
};

export const deleteTour = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Tour.findByIdAndDelete(id);
    res.status(200).send({ msg: "Deleted success" });
  } catch (error) {
    res.status(500).send({ error: error });
  }
};
