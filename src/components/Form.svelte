<script>
    import { page } from '$app/stores';
    import { onMount } from 'svelte';

    // set this up so the form can go back to original after submission
    let formInitialHTML;
    onMount(() => {
        formInitialHTML = form.innerHTML;
    });

    let form;
    let name;
    let email;
    let message;

    function handleClear() {
        name = '';
        email = '';
        message = '';
    }

    function processFormData() {
        const data = new FormData();
        data.append('name', name);
        data.append('email', email);
        data.append('message', message);
        data.append('formType', 'Web Enquiry');
        // below needed by netlify. should be the same value as form name in html
        data.append('form-name', 'contact');
        return data;
    }

    function processForm() {
        const data = processFormData();
        fetch('/', {
            method: 'POST',
            body: data,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response;
            })
            .then((res) => {
                form.innerHTML = `
                    <div>
                        <h2 style="font-size: 150%; font-weight: 700; word-spacing: -.15rem;"> 🎉 Success!!</h2>
                        <p>Thank you for your enquiry! We will reply as soon as we can!</p>
                    </div>
                `;
            })
            .catch((error) => {
                form.innerHTML = `
                    <div>
                        <h2 style="font-size: 150%; font-weight: 700; word-spacing: -.15rem;"> 🛑 Error </h2>
                        <p>It's not your fault, we are sorry about that 🙏🙏!!</p>
                        <p>${JSON.parse(error)}</p>
                    </div>
                `;
            })
            .finally(() => {
                setTimeout(() => {
                    form.innerHTML = formInitialHTML;
                }, 2 * 60 * 1000); // 2 min
            });
    }
</script>

<style>
    form {
        min-height: 350px;
    }
    label {
        opacity: 0.8;
    }

    input,
    textarea {
        display: block;
        box-sizing: border-box;
        width: 100%;
        border: none;
        padding: 0.375rem 0.75rem;
        min-height: calc(1.5em + 0.75rem + 0.75rem + 2px);
        background-color: transparent;
        color: white;
    }

    textarea {
        padding: 0.75rem;
        margin-top: 1em;
        resize: none;
        min-height: calc(10em + 0.75rem + 0.75rem + 2px);
        background-color: rgba(255, 255, 255, 0.2);
    }

    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
        transition: background-color 5000s ease-in-out 0s;
        -webkit-text-fill-color: white !important;
    }

    input:focus {
        outline: 0;
    }

    .contact-form {
        margin-top: 2em;
    }

    .first-row {
        display: flex;
        align-items: flex-end;
    }

    .last-row {
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
    }

    .spacer {
        width: 1.5em;
    }

    .name-col {
        flex: 2 1 0%;
        display: block;
        padding: 1em 0;
    }

    .email-col {
        flex: 3 1 0%;
        display: block;
        padding: 1em 0;
    }

    .text-input-border {
        height: 3px;
        border-radius: 2px;
        background-color: #cacaca;
    }

    button {
        margin: 1em 0.25em;
        cursor: pointer;
        border-radius: 5px;
        border-style: solid;
        padding: 1rem 1rem;
        min-height: calc(1.5em + 1rem + 2px);
        color: #ffffff;
    }

    button[type='submit'] {
        background-color: #bd866d;
        border-color: #bd866d;
    }

    .button-clear {
        background-color: transparent;
    }

    .hidden {
        visibility: hidden;
    }
</style>

<form
    name="contact"
    action={$page.path}
    method="post"
    class="contact-form"
    netlify-honeypot="bot-field"
    data-netlify="true"
    on:submit|preventDefault={processForm}
    bind:this={form}>
    <input type="hidden" name="bot-field" />
    <input type="hidden" name="formType" value="Web Enquiry" />
    <div class="first-row">
        <div class="name-col">
            <label for="contact__name">First Name</label>
            <input
                id="contact__name"
                type="text"
                name="name"
                bind:value={name}
                required />
            <div class="text-input-border" />
        </div>
        <div class="spacer" />
        <div class="email-col">
            <label for="contact__email">Email</label>
            <input
                id="contact__email"
                type="email"
                name="email"
                bind:value={email}
                required />
            <div class="text-input-border" />
        </div>
    </div>
    <label for="contact__message">Message:</label>
    <textarea
        id="contact__message"
        name="message"
        bind:value={message}
        required />
    <div class="last-row">
        <button
            class:hidden={!name && !email && !message}
            class="button-clear"
            on:click={handleClear}>
            Cancel
        </button>
        <button type="submit">Submit</button>
    </div>
</form>
