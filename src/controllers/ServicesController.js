import service from "../models/ServiceModels";
// createServive
export const createService = async (req, res) => {
  try {
    const { title, content } = req.body;
    const makeServise = await service.create({
      title,
      content,
    });

    return res.status(200).json({
      status: "200",
      message: "Service Created",
      data: makeServise,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed to Create Service",
    });
  }
};

// getAll
export const getAll = async (req, res) => {
  try {
    const getAll = await service.find();
    return res.status(200).json({
      status: "200",
      message: "Succefully Retrieved",
      data: getAll,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed To Get All Services",
    });
  }
};
// getAll
export const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const getAll = await service.findById(id);
    if (!getAll) {
      return res.status(404).json({
        status: "404",
        message: "Id Not Founf",
      });
    }
    return res.status(200).json({
      status: "200",
      message: "Succefully Retrieved",
      data: getAll,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed To Get All Services",
    });
  }
};
// getAll
export const delService = async (req, res) => {
  try {
    const { id } = req.params;
    const getAll = await service.findById(id);
    if (!getAll) {
      return res.status(404).json({
        status: "404",
        message: "Id Not Found",
      });
    }
    await service.findByIdAndDelete(id);
    return res.status(200).json({
      status: "200",
      message: "Succefully Deleted",
      data: getAll,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed To Delete Services",
    });
  }
};

// update
export const upService = async (req, res) => {
  try {
    const { title, content } = req.body;
    const { id } = req.params;
    const getAll = await service.findById(id);
    if (!getAll) {
      return re.status(404).json({
        status: "404",
        message: "Service Id Not Found ",
      });
    }
    await service.findByIdAndUpdate(id, {
      title,
      content,
    });

    return res.status(200).json({
      status: "200",
      message: "Service Updated Well",
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed to Create Service",
    });
  }
};
