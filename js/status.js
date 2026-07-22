/**
 * Calculates the current status of a client
 * based on the expiration date.
 *
 * @param {string} expirationDate
 * @returns {string}
 */

export function calculateClientStatus(expirationDate) {

    const today = new Date();

    const expiration = new Date(expirationDate);

    const differenceInTime =
        expiration.getTime() - today.getTime();

    const differenceInDays =
        Math.ceil(
            differenceInTime /
            (1000 * 60 * 60 * 24)
        );


    if (differenceInDays < 0) {

        return "expired";

    }


    if (differenceInDays <= 7) {

        return "expiring";

    }


    return "active";

}
