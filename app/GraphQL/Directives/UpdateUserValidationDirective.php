<?php

namespace App\GraphQL\Directives;

use Nuwave\Lighthouse\Schema\Directives\BaseDirective;

class UpdateUserValidationDirective extends BaseDirective
{
    // TODO implement the directive https://lighthouse-php.com/master/custom-directives/getting-started.html
    public function rules(): array
    {
        return [
            'name' => ['required','min: 4'],
            'password' => ['required','min: 4'],
            'email' => ['required','email', Rule::unique('users', 'email')->ignore($this->args['id'], 'id')],
        ];
    }

}
