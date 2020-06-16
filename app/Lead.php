<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{
    protected $guarded = [];
    
    public function user() {
        return $this->belongsTo(\App\User::class,'user_id');
    }
    public function tasks() {
        return $this->hasMany(\App\LeadTask::class,'lead_id');
    }
}
