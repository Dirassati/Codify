const parentService = require("../services/parentService");
const catchAsync = require("../utils/catchAsync");

exports.listParents = catchAsync(async (req, res) => {
  const parents = await parentService.listParentsWithChildrenCount();
  
  res.status(200).json({
    status: "success",
    data: parents.map(parent => ({
      id: parent.id,
      nom: parent.last_name,
      prenom: parent.first_name,
      telephone: parent.phone_number,
      adresse: parent.address,
      profession: parent.profession,
      etat_civil: parent.etat_civil,
      carte_identite: parent.card_id,
      email: parent.email,
      nombre_enfants: parent.children_count
    }))
  });
});

exports.listParentChildren = catchAsync(async (req, res) => {
  const { parentId } = req.params;
  
  const result = await parentService.getParentWithChildren(parentId);
  
  if (result.error) {
    return res.status(result.statusCode).json({
      status: "error",
      message: result.message
    });
  }

  res.status(200).json({
    status: "success",
    data: result.children
  });
});

exports.getParentByCardId = catchAsync(async(req,res)=>{
  const cardId = req.body;
  const parentId = parentService.getParentByCardId(cardId);
   if (result.error) {
    return res.status(result.statusCode).json({
      status: "error",
      message: result.message
    });
  }
  if (!parentId) {
    return res.status(result.statusCode).json({
      status:"error",
      message:"this cardId doesn't exists"
    })
  }
  res.status(200).json({
    status: "success",
    parentId: parentId,
  });

})

