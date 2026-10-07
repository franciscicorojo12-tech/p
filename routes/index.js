var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

router.get('/contact', function(req, res) {
  res.render('contact', {
    title: 'Contacto',
    errors: [],
    values: { name: '', email: '', phone: '', subject: 'consulta', message: '' },
    sent: false
  });
});

router.post('/contact', function(req, res) {
  var name = (req.body.name || '').trim();
  var email = (req.body.email || '').trim();
  var phone = (req.body.phone || '').trim();
  var subject = (req.body.subject || 'consulta').trim();
  var message = (req.body.message || '').trim();
  var privacy = req.body.privacy === 'on';
  var errors = [];

  if (name.length < 2) {
    errors.push('El nombre debe tener al menos 2 caracteres.');
  }
  if (!isValidEmail(email)) {
    errors.push('Introduce un correo electrónico válido.');
  }
  if (message.length < 10) {
    errors.push('El mensaje debe tener al menos 10 caracteres.');
  }
  if (!privacy) {
    errors.push('Debes aceptar la política de privacidad para enviar el formulario.');
  }

  var values = { name: name, email: email, phone: phone, subject: subject, message: message };

  if (errors.length) {
    return res.status(400).render('contact', {
      title: 'Contacto',
      errors: errors,
      values: values,
      sent: false
    });
  }

  console.log('Nuevo mensaje de contacto:', values);

  res.render('contact', {
    title: 'Contacto',
    errors: [],
    values: { name: '', email: '', phone: '', subject: 'consulta', message: '' },
    sent: true
  });
});

module.exports = router;
