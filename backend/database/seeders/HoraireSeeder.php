<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Drive;
use App\Models\Horaire;
use App\Enums\JourEnum;
use App\Models\Periode;

class HoraireSeeder extends Seeder
{
    public function run()
    {
        $drives = Drive::all();

        $periode_all_day = Periode::where('heureDebut', '08:30')->where('heureFin', '18:00')->first();
        $periode_samedi = Periode::where('heureDebut', '09:00')->where('heureFin', '13:00')->first();

        foreach ($drives as $drive) {
            foreach (JourEnum::values() as $jour) {
                $horaire = Horaire::create([
                    'drive_id' => $drive->drive_id,
                    'jour' => $jour,
                    'ouvert' => !in_array($jour, ['Dimanche']),
                ]);

                if (!in_array($jour, ['Samedi', 'Dimanche'])) {
                    $horaire->periodes()->attach($periode_all_day->periode_id);
                } elseif ($jour === 'Samedi') {
                    $horaire->periodes()->attach($periode_samedi->periode_id);
                }
            }
        }
    }
}