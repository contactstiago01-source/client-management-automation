import { clients } from "./clients.js";

import { calculateClientStatus } from "./status.js";


const tableBody =
    document.getElementById(
        "clients-table-body"
    );


const emptyState =
    document.getElementById(
        "empty-state"
    );


const totalClientsElement =
    document.getElementById(
        "total-clients"
    );


const activeClientsElement =
    document.getElementById(
        "active-clients"
    );


const expiringClientsElement =
    document.getElementById(
        "expiring-clients"
    );


const expiredClientsElement =
    document.getElementById(
        "expired-clients"
    );


const currentDateElement =
    document.getElementById(
        "current-date"
    );


/**
 * Formats a date for display.
 *
 * @param {string} date
 * @returns {string}
 */

function formatDate(date) {

    return new Date(date)
        .toLocaleDateString(
            "pt-BR"
        );

}


/**
 * Creates a visual status badge.
 *
 * @param {string} status
 * @returns {string}
 */

function createStatusBadge(status) {


    const statusLabels = {

        active: "Active",

        expiring: "Expiring Soon",

        expired: "Expired"

    };


    return `

        <span
            class="status-badge status-${status}"
        >

            ${statusLabels[status]}

        </span>

    `;

}


/**
 * Renders clients into the table.
 */

function renderClients() {


    tableBody.innerHTML = "";


    if (clients.length === 0) {

        emptyState.style.display = "block";

        return;

    }


    emptyState.style.display = "none";


    clients.forEach((client) => {


        const status =
            calculateClientStatus(
                client.expirationDate
            );


        const row =
            document.createElement(
                "tr"
            );


        row.innerHTML = `

            <td>
                <strong>
                    ${client.name}
                </strong>
            </td>

            <td>
                ${client.service}
            </td>

            <td>
                ${formatDate(
                    client.startDate
                )}
            </td>

            <td>
                ${formatDate(
                    client.expirationDate
                )}
            </td>

            <td>
                ${createStatusBadge(
                    status
                )}
            </td>

            <td>
                <button
                    class="action-button"
                    type="button"
                >
                    View
                </button>
            </td>

        `;


        tableBody.appendChild(row);

    });

}


/**
 * Updates dashboard statistics.
 */

function updateDashboard() {


    const total =
        clients.length;


    const active =
        clients.filter(
            (client) =>
                calculateClientStatus(
                    client.expirationDate
                ) === "active"
        ).length;


    const expiring =
        clients.filter(
            (client) =>
                calculateClientStatus(
                    client.expirationDate
                ) === "expiring"
        ).length;


    const expired =
        clients.filter(
            (client) =>
                calculateClientStatus(
                    client.expirationDate
                ) === "expired"
        ).length;


    totalClientsElement.textContent =
        total;


    activeClientsElement.textContent =
        active;


    expiringClientsElement.textContent =
        expiring;


    expiredClientsElement.textContent =
        expired;

}


/**
 * Displays the current date.
 */

function displayCurrentDate() {


    const today =
        new Date();


    currentDateElement.textContent =
        today.toLocaleDateString(
            "pt-BR",
            {

                day: "2-digit",

                month: "long",

                year: "numeric"

            }

        );

}


/**
 * Initializes the application.
 */

function initializeApplication() {


    renderClients();

    updateDashboard();

    displayCurrentDate();

}


initializeApplication();
