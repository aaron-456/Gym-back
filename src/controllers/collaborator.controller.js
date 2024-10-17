const CollaboratorService = require('../services/collaborator.service');
const catchAsync = require('../utils/cachAsync');

const collaboratorService = new CollaboratorService();

exports.resgisterCollaborator = catchAsync(async (req, res, next) => {
  const adminUser_Id = req.params.id;
  const schemaName = req.params.schemaName;
  const collaboratorData = req.body;

  const { newCollaborator, token } = await collaboratorService.createCollaborator(
    adminUser_Id,
    collaboratorData,
    schemaName
  );

  res.status(201).json({
    message: 'Colaborador creado perfectamente',
    collaborator: newCollaborator,
    token,
  });
});
