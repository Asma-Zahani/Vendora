<!DOCTYPE html>
<html>
<head>
    <title>Vérification de l'adresse email</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; text-align: center;">
    <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 8px;">
        
        <!-- Logo -->
        <div style="text-align: center;">
            <img src="logo.png" alt="Logo" style="height: 50px;">
        </div>

        <h2 style="color: #333;">Bonjour {{ $user->prenom }} {{ $user->nom }},</h2>
        <p style="color: #555;">Merci de vous être inscrit sur notre plateforme. Veuillez vérifier votre adresse email en cliquant sur le lien suivant :</p>

        <a href="{{ $verificationUrl }}" style="display: inline-block; padding: 10px 20px; margin: 20px 0; color: white; background-color: #665292FF; text-decoration: none; border-radius: 5px;">
            Vérifier mon adresse email
        </a>

        <p style="color: #555;">Si vous n'avez pas créé de compte, ignorez simplement cet email.</p>

        <!-- Footer -->
        <p style="margin-top: 20px; color: #999; font-size: 12px;">
            © {{ date('Y') }} KD Marché. Tous droits réservés.
        </p>
    </div>
</body>
</html>
{# <!DOCTYPE html>
<html>
<head>
    <title>Vérification de l'adresse email</title>
</head>
<body>
    <p>Bonjour {{ $user->prenom }} {{ $user->nom }},</p>
    <p>Merci de vous être inscrit sur notre plateforme. Veuillez vérifier votre adresse email en cliquant sur le lien suivant :</p>
    <a href="{{ $verificationUrl }}">Vérifier mon adresse email</a>
    <p>Si vous n'avez pas créé de compte, ignorez simplement cet email.</p>
</body>
</html> #}
