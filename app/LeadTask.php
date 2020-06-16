<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LeadTask extends Model
{
    protected $guarded = [];
    public function assigned_to() {
        return $this->belongsTo(\App\User::class,'assigned_to');
    }
    public function lead() {
        return $this->belongsTo(\App\Lead::class,'lead_id');
    }
}
