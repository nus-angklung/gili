<script>
    import ContactForm from './Form.svelte';
</script>

<style>
    * {
        font-size: 16px;
    }
    h6 {
        font-size: 19px;
    }
    .question {
        font-weight: 600;
    }
    .answer {
        opacity: 0.8;
    }
</style>

<footer>
    <h6 class="question">
        Have a passion for Angklung? Have an idea for collaboration?
    </h6>
    <h6 class="answer">Contact us! We are happy to hear from you!</h6>
    <ContactForm />
</footer>
