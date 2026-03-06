export const formatDate = (dateString, options = {}) => {
    const defaultOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    return new Date(dateString).toLocaleDateString('en-US', {
        ...defaultOptions,
        ...options
    });
};
