alter table courses
    add constraint check_duration_in_hours
        check (duration_in_hours <= 100);

alter table courses
    add constraint check_duration_lesson
        check (duration_lesson <= 100);

