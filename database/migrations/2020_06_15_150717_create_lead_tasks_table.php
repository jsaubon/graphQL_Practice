<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLeadTasksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('lead_tasks', function (Blueprint $table) {
            $table->id();
            $table->integer('lead_id')->unsigned();
            $table->integer('assigned_to')->unsigned()->nullable();
            $table->string('task');
            $table->boolean('urgent')->defatul(false);
            $table->dateTime('due_date');
            $table->dateTime('date_completed')->nullable();
            $table->boolean('completed')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('lead_tasks');
    }
}
