<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateSportRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $id = $this->route('id');
        return [
            'sportNev' => [
                'required',
                'string',
                'min:2',
                'max:75',
                // Itt mondjuk meg, hogy legyen egyedi, de hagyja ki az aktuális ID-t
                Rule::unique('sports', 'sportNev')->ignore($id),
            ],
        ];
    }
    public function messages(): array
    {
        return [
            'sportNev.required' => 'A sport nevének megadása kötelező!',
            'sportNev.string' => 'A sport neve string kell legyen!',
            'sportNev.unique' => 'Már van ilyen sportnév!',
            'sportNev.min' => 'A sport nevének hossza min: 2',
            'sportNev.max' => 'A sport nevének hossza max: 75',
        ];
    }
}
