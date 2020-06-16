<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\LeadTask;
use Faker\Generator as Faker;

$factory->define(LeadTask::class, function (Faker $faker) {
    $lead = factory(\App\Lead::class)->create();
    return [
        'lead_id' => $lead->id,
        'assigned_to' => $lead->user_id,
        'task' => $faker->text,
        'urgent' => $faker->boolean(20),
        'due_date' =>  $faker->dateTimeBetween('-5 days','+5 days'),
        // 'date_completed' => $faker->dateTimeBetween('-5 days','+5 days')
    ];
});
