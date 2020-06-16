<?php

namespace App\GraphQL\Directives;

use Nuwave\Lighthouse\Schema\Directives\BaseDirective;

class UpdateLeadValidationDirective extends BaseDirective
{
    // TODO implement the directive https://lighthouse-php.com/master/custom-directives/getting-started.html
    public function rules(): array
    {
        return [
            'email_address' => ['email', Rule::unique('leads', 'email_address')->ignore($this->args['id'], 'id')],
            'phone_number' => ['email', Rule::unique('users', 'phone_number')->ignore($this->args['id'], 'id')],
        ];
    }
}
