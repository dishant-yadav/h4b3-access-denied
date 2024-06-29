module.exports = (success, data) => {
    if(!success && data instanceof Error) data = data.message;
    return { success: success, data: data };
}