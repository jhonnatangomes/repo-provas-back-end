import Joi from 'joi';
import { Exam } from '../protocols/examInterface';
import { Validation } from '../protocols/validationInterface';

const schema = Joi.object({
    name: Joi.string().required(),
    category: Joi.string().required(),
    semester: Joi.string().required(),
    subject: Joi.string().required(),
    teacher: Joi.string().required(),
    link: Joi.string()
        .pattern(/(http|https):\/\/.+\.pdf/)
        .required(),
});

export default function validateExam(body: Exam): Validation {
    const validate = schema.validate(body);
    if (validate.error) {
        return {
            isValid: false,
            message: validate.error.message,
        };
    }
    return {
        isValid: true,
    };
}
