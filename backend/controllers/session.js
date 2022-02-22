const Session = require ('./../models/Session');

exports.createSession = (req, res, next )=> {

    const date = Date.now()

    const session = new Session ({

        dateStart : date

    });

    session.save()
    .then(() => res.status(201).json({ idSession : session._id}))
    .catch(error => res.status(400).json({ error }));

}