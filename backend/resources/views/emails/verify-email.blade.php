<!DOCTYPE html>
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
</html>
