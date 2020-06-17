<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class Lead extends Model
{
    use Searchable;
    protected $guarded = [];
    
    public function user() {
        return $this->belongsTo(\App\User::class,'user_id');
    }
    public function tasks() {
        return $this->hasMany(\App\LeadTask::class,'lead_id');
    }
}
