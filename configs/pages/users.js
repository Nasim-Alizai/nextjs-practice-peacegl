import Joi from "joi";
import { IconHome2, IconUser } from "@tabler/icons";

const breadcrumb = [
	{ title: "Home", icon: IconHome2, href: "/" },
	{ title: "Users", icon: IconUser, href: "false" },
];
const headers = [
	{
		title: "ID",
		value: "id",
		hasSort: true,
	},
	{
		title: "Name",
		value: "firstname",
		hasSort: true,
	},
	{
		title: "Username",
		value: "username",
		hasSort: false,
	},
	{
		title: "Email",
		value: "email",
		hasSort: false,
	},
	{
		title: "Phone",
		value: "phone",
		hasSort: false,
	},
	{
		title: "Gender",
		value: "gender",
		hasSort: false,
	},
	{
		title: "Status",
		value: "status",
		hasSort: false,
	},
	{
		title: "Birth Date",
		value: "birth_date",
		hasSort: false,
	},
	{
		title: "Created at",
		value: "created_at",
		hasSort: false,
	},
	{
		title: "Updated at",
		value: "updated_at",
		hasSort: false,
	},
];
const schema = Joi.object({
	firstname: Joi.string()
		.min(2)
		.message("Firstname should have at least 2 letters")
		.required(),
	lastname: Joi.string(),
	email: Joi.string().email({
		minDomainSegments: 2,
		tlds: false,
	}),
	phone: Joi.string()
		.required()
		.pattern(/\+\d{2} \d{3} \d{3} \d{3}/),
	whatsapp: Joi.string().required(),
	job_title: Joi.string(),
	username: Joi.string().alphanum().min(3).max(30).required(),
	birth_date: Joi.date(),
	gender: Joi.string().valid("male", "female", "none_binary"),
	image: Joi.any(),
	password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
	confirm_password: Joi.ref("password"),
	attachment_id: Joi.string(),
});
const updateSchema = Joi.object({
	id: Joi.string().required(),
	firstname: Joi.string()
		.min(2)
		.message("Firstname should have at least 2 letters")
		.required(),
	lastname: Joi.string(),
	email: Joi.string().email({
		minDomainSegments: 2,
		tlds: false,
	}),
	phone: Joi.string()
		.required()
		.pattern(/\+\d{2} \d{3} \d{3} \d{3}/),
	whatsapp: Joi.string().required(),
	job_title: Joi.string(),
	username: Joi.string().alphanum().min(3).max(30).required(),
	birth_date: Joi.date(),
	gender: Joi.string().valid("male", "female", "none_binary"),
	image: Joi.any(),
	attachment_id: Joi.string(),
});
export { breadcrumb, headers, schema, updateSchema };
