document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const message = document.getElementById('contact-message').value;
    
    // Burada form verilerini işleyebilir veya bir API'ye gönderebilirsiniz
    console.log({ name, email, message });
    
    alert('Mesajınız başarıyla gönderildi! En kısa sürede dönüş yapacağız.');
    this.reset();
});