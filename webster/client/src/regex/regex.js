const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const FULLNAME_REGEX = /^['а-яА-ЯїЇґҐіІєЄa-zA-Z\s]{2,24}$/
const TITLE_REGEX = /^[a-zA-Zа-яА-Яє-їЄ-Ї0-9_/\s/\.]{3,23}$/;
const DESCRIPTION_REGEX = /^[a-zA-Zа-яА-Яє-їЄ-Ї0-9,-_!?%$#@^&*\\\.();:`~"/\s/\.]{10,10000}$/;
const NUMBER_REGEX = /^\d+$/;

export { USER_REGEX, PWD_REGEX, EMAIL_REGEX, FULLNAME_REGEX, TITLE_REGEX, DESCRIPTION_REGEX, NUMBER_REGEX }