<?php

namespace Database\Factories;

use App\Models\Horaire;
use App\Enums\JourEnum;
use Illuminate\Database\Eloquent\Factories\Factory;

class HoraireFactory extends Factory
{
    protected $model = Horaire::class;

    protected static array $joursUtilises = [];

    public function definition()
    {
        // Récupérer la liste des jours qui ne sont pas encore utilisés
        $joursDisponibles = array_diff(
            array_map(fn($enum) => $enum->value, JourEnum::cases()), 
            static::$joursUtilises
        );

        // Si tous les jours sont utilisés, on lève une exception
        if (empty($joursDisponibles)) {
            throw new \Exception("Tous les jours ont déjà été utilisés dans HoraireFactory.");
        }

        // Sélectionner un jour unique et l'ajouter à la liste des jours utilisés
        $jour = $this->faker->randomElement($joursDisponibles);
        static::$joursUtilises[] = $jour;

        return [
            'jour' => $jour,
            'ouvert' => $this->faker->boolean(80),
        ];
    }
}
