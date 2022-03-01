const Options = require('./../models/Option');

exports.createOption = (req, res, next ) => {

    const optionJSON = JSON.parse(req.body);
    const option = new Options ({

        sessionId : optionJSON.sessionId,
        matricule : optionJSON.matricule,
        folderIn : optionJSON.folderIn,
        folderOut : optionJSON.folderOut,
        establishment : optionJSON.establishment,

    });
    option.save()
    .then((option)=> {
        res.status(200).json(thing);
    })
    .catch((error) => {
     res.status(404).json({
        error: error
        });
        }
    );
    

}