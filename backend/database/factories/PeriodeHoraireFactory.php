<?php

namespace Database\Factories;

use App\Models\PeriodeHoraire;
use App\Models\Horaire;
use Illuminate\Database\Eloquent\Factories\Factory;

class PeriodeHoraireFactory extends Factory
{
    protected $model = PeriodeHoraire::class;

    public function definition()
    {
        return [
            'heure_debut' => $this->faker->time('H:i', '08:00'),  // Heure de début entre 08:00 et 09:00
            'heure_fin' => $this->faker->time('H:i', '17:00'),  // Heure de fin entre 09:00 et 17:00
        ];
    }

    /**
     * Lier des horaires à la période horaire.
     *
     * @param  int  $count
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function withHoraires($count = 3)
    {
        return $this->afterCreating(function (PeriodeHoraire $periodeHoraire) use ($count) {
            $horaires = Horaire::inRandomOrder()->limit($count)->get();

            $periodeHoraire->horaires()->attach($horaires->pluck('horaire_id')); // Utilisation correcte de la clé
        });
    }

}
