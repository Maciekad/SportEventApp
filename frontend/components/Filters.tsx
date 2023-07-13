import { Text, Box, Card, CardBody, Checkbox, CheckboxGroup, Heading, Stack } from "@chakra-ui/react";

interface FiltersProps {
    setFilterSections: React.Dispatch<React.SetStateAction<FilterSections>>,
    setCategoryFilters: React.Dispatch<React.SetStateAction<Set<String>>>
}

export enum Category {
    DISCIPLINE = 'discipline',
    LEVEL = 'level',
    GENDER = 'gender'
}

interface CategoryFilters {
    section: String,
    filters: String[]
}

export interface FilterSections {
    isSportFilter: Boolean,
    isLevelFilter: Boolean,
    isGenderFilter: Boolean
}

export const categories: CategoryFilters[] = [{
    section: Category.DISCIPLINE,
    filters: ['Volleyball', 'Football', 'Basketball', 'Tennis', 'Cycling']
},
{
    section: Category.LEVEL,
    filters: ['Advanced', 'Semi-advanced', 'Beginner', 'Recreational']
},
{
    section: Category.GENDER,
    filters: ['Male', 'Female', 'Mix']
}
]

const Filters = (props: FiltersProps) => {
    const updateFilters = (checked: Boolean, categoryFilter: String, section: String) => {

        if (checked) {
            props.setCategoryFilters((prev) => new Set(prev).add(categoryFilter));
            setSectionFilters(section, true)
        }
        if (!checked) {

            setSectionFilters(section, false)
            props.setCategoryFilters((prev) => {
                const next = new Set(prev);
                next.delete(categoryFilter);
                return next;
            });
        }
    }

    const setSectionFilters = (section: String, isEnabled: Boolean) => {
        props.setFilterSections(prev => {

            if (section === Category.DISCIPLINE) prev.isSportFilter = isEnabled;
            if (section === Category.LEVEL) prev.isLevelFilter = isEnabled;
            if (section === Category.GENDER) prev.isGenderFilter = isEnabled;

            return prev;
        })
    }

    return (
        <Card p={4} w={'100%'}>
            <CardBody>
                <Heading size={"md"}>Filter by the following criteria</Heading>
                {categories.map((cat: CategoryFilters, index) =>
                    <Box key={index} my={5}>
                        <Text fontWeight='semibold' my={4}>
                            {cat.section}
                        </Text>
                        <CheckboxGroup colorScheme='green' defaultValue={['mix']}>
                            <Stack spacing={[1, 2]}>
                                {cat.filters.map((filter: String, index) =>
                                    <Checkbox key={index} onChange={(e) => updateFilters(e.target.checked, filter, cat.section)}>{filter}</Checkbox>
                                )}
                            </Stack>
                        </CheckboxGroup>
                    </Box>
                )}
            </CardBody>
        </Card>
    );
}

export default Filters;