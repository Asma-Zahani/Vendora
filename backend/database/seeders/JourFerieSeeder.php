<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;
use App\Models\JourFerie;
use App\Models\Drive;
use Carbon\Carbon;

class JourFerieSeeder extends Seeder
{
    public function run()
    {   
        $translations = [
            "New Year" => "Jour de l'An",
            "Ramadan Start" => "Début du Ramadan",
            "Independence Day" => "Jour de l'Indépendance",
            "March Equinox" => "Équinoxe de mars",
            "Martyrs' Day" => "Journée des Martyrs",
            "Labour Day" => "Fête du Travail",
            "June Solstice" => "Solstice de juin",
            "Muharram" => "Nouvel an islamique (Mouharram)",
            "Republic Day" => "Jour de la République",
            "Women’s Day" => "Journée des Femmes",
            "The Prophet's Birthday" => "Anniversaire du Prophète",
            "September Equinox" => "Équinoxe de septembre",
            "Evacuation Day" => "Jour de l'Évacuation",
            "Revolution and Youth Day" => "Jour de la Révolution et de la Jeunesse",
            "December Solstice" => "Solstice de décembre",
        ];
        
        $url = 'https://calendarific.com/api/v2/holidays';
        $response = Http::get($url, [
            'api_key' => 'vHzydvI4aLdlXbRLhI32qyvVEev9PdMy',
            'country' => 'TN',
            'year' => 2025,
        ]);

        if (!$response->successful()) {
            $this->command->error('API request failed: ' . $response->body());
            return;
        }

        $holidays = $response->json()['response']['holidays'];
        $drives = Drive::all();
        
        $eidFitrDates = [];
        $eidAdhaDates = [];

        foreach ($holidays as $holiday) {
            $date = Carbon::parse($holiday['date']['iso'])->format('Y-m-d H:i:s');

            if (in_array($holiday['name'], ["Eid al-Fitr", "Eid al-Fitr Holiday"])) {
                $eidFitrDates[] = $date;
                continue;
            }

            if (in_array($holiday['name'], ["Eid al-Adha", "Eid al-Adha Holiday"])) {
                $eidAdhaDates[] = $date;
                continue;
            }
            
            foreach ($drives as $drive) {
                JourFerie::create([
                    'title' => $translations[$holiday['name']] ?? $holiday['name'],
                    'start' => $date,
                    'end' => $date,
                    'drive_id' => $drive->drive_id,
                ]);
            }
        }

        if (count($eidFitrDates) > 0) {
            sort($eidFitrDates);
            $start = $eidFitrDates[0];
            $end = $eidFitrDates[count($eidFitrDates) - 1];

            foreach ($drives as $drive) {
                JourFerie::create([
                    'title' => 'Aïd al-Fitr',
                    'start' => $start,
                    'end' => $end,
                    'drive_id' => $drive->drive_id,
                ]);
            }
        }

        if (count($eidAdhaDates) > 0) {
            sort($eidAdhaDates);
            $start = $eidAdhaDates[0];
            $end = Carbon::parse($eidAdhaDates[count($eidAdhaDates) - 1])->addDay()->format('Y-m-d H:i:s');

            foreach ($drives as $drive) {
                JourFerie::create([
                    'title' => 'Aïd al-Adha',
                    'start' => $start,
                    'end' => $end,
                    'drive_id' => $drive->drive_id,
                ]);
            }
        }
        // JourFerie::factory(10)->create();
    }
}