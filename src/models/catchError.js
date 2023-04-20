/**
 * The function "catchError" returns an object with error information extracted from the "response"
 * property of an error object.
 * @param error - The `error` parameter is an object that represents an error that occurred during the
 * execution of a function or code block. It may contain information about the error, such as an error
 * message, a stack trace, or an HTTP response object.
 * @returns A JavaScript object with three properties: `success` (a boolean value set to `false`),
 * `status` (a number representing the HTTP status code of the error response, or `null` if there is no
 * response), and `statusText` (a string representing the status message of the error response, or
 * `null` if there is no response).
 */

export default function catchError(error) {
    const { response } = error;

    console.log({
        success: false,
        status: response?.status || null,
        statusText: response?.statusText || null,
    });

    return {
        success: false,
        status: response?.status || null,
        statusText: response?.statusText || null,
    }
}
