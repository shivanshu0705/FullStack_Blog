(() => {
    const getJsonData = async (url, options) => {
        try {
            const response = await fetch(url, options);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => { 

        e.preventDefault();
        try {
            // Assuming your API endpoint is "/api/ai"
            const apiUrl = '/api/ai';
            const options = {
                method: "POST",
                body: JSON.stringify({ prompt: e.target.prompt.value }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
            }
            console.log(options)
            const responseData = await getJsonData(apiUrl, options);
            console.log(responseData)
            // Update the content in the response container (replace with your actual data structure)
            const responseContainer = document.getElementById('content');
            responseContainer.innerHTML = `<p>${responseData.content}</p>`; // Replace with your actual data structure

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // open and close notice dialog
    const handleNotice = () => {
        const noticeDialog = document.getElementById('noticeDialog');
        noticeDialog.showModal()

        document.querySelector('#dialog').onsubmit = (e) => {
            e.preventDefault();

            noticeDialog.close();
        }
    }

    window.onload = () => {
        handleNotice()
    }
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelector('form').onsubmit = handleSubmit;
    });
})();
