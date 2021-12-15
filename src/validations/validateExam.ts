import Joi from "joi";
import { SendExam } from "../protocols/examInterface";
import { Validation } from "../protocols/validationInterface";

const schema = Joi.object({
    examName: Joi.string().required(),
    category: Joi.string().required(),
    semester: Joi.string().required(),
    subject: Joi.string().required(),
    teacher: Joi.string().required(),
    link: Joi.string().uri({
        scheme: '/^(http|https).*.pdf$/'
    }),
})

export default function validateExam(body: SendExam): Validation {
    const validate = schema.validate(body);
    if(validate.error) {
        return {
            isValid: false,
            message: validate.error.message
        }
    }
    return {
        isValid: true
    }
}