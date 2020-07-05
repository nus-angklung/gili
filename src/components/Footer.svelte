<script>
    import ContactForm from './Form.svelte';
</script>

<style>
    footer {
        font-size: 19px;
        color: white;
    }
    h6 {
        font-size: 1em;
    }
    .question {
        font-weight: 600;
    }
    .answer {
        opacity: 0.8;
    }
    .container {
        max-width: 80%;
        padding: 2em;
        margin: 0 auto;
        box-sizing: border-box;
    }
    .form {
        display: grid;
        grid-template-columns: repeat(12, 1fr);
    }
    .form > * {
        grid-column: 1 / 9;
    }
    .links {
        background: url('/wave.svg') no-repeat bottom center;
        background-size: cover;
        min-height: 20vw;
    }
    .links-container {
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
        font-weight: 500;
        line-height: 28px;
    }
    .links-col {
        margin: 0 1em;
        font-size: 16px;
    }
    .links-col > div {
        opacity: 0.8;
    }
    .links-col > ul {
        list-style-type: none;
        padding-inline-start: 0;
    }
    .links-col > ul li:hover {
        color: red;
    }
    .copyright-tag {
        border-top: 1px solid black;
        background-color: rgba(245, 236, 207, 0.4);
        font-size: 12px;
        text-align: center;
        padding: 0.5rem;
    }
    @media (max-width: 992px) {
        footer {
            font-size: 16px;
        }
        .links {
            background: rgba(245, 236, 207, 0.4);
        }
        .links-col {
            font-size: 14px;
        }
        .form > * {
            grid-column: 1 / 13;
        }
    }
    @media (min-width: 992px) {
        .form {
            transform: translateY(12.5vw);
        }
        .links-container {
            transform: translateY(7.5vw);
        }
    }
    @media (max-width: 400px) {
        footer {
            font-size: 14px;
        }
        container {
            max-width: 90%;
        }
    }
</style>

<footer>
    <div class="form container">
        <h6 class="question">
            Have a passion for Angklung? Have an idea for collaboration?
        </h6>
        <h6 class="answer">Contact us! We are happy to hear from you!</h6>
        <div>
            <ContactForm />
        </div>
    </div>
    <div class="links">
        <div class="container links-container">
            <div class="links-col">
                <div>Links</div>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Our Music</li>
                </ul>
            </div>
            <div class="links-col">
                <div>Social</div>
                <ul>
                    <li>Instagram</li>
                    <li>Facebook</li>
                    <li>Youtube</li>
                </ul>
            </div>
        </div>
    </div>
    <div class="copyright-tag">
        Copyright 2020 - Present. NUS Angklung. Part of NUS Cultural Activities
        Club.
    </div>
</footer>
