export const badRequest = (res, message = 'Bad request') => {
    res.status(400).json({
        message: message
    })
}

export const serverError = (res, error, message = 'Internal server error please try again afrer sometime') => {
    console.log(error);
    res.status(500).json({
        message
    });
}

export const sendResponse = (res, data) => {
    res.json(data);
}