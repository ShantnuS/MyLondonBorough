import csv
import json

file = open("London_Postcodes_data_Reduced.csv")

csvreader = csv.reader(file)
header = next(csvreader)
print(header)

output_dictionary = {}

for row in csvreader:
    borough = row[0]
    postcode = row[1]

    if (borough not in output_dictionary):
        output_dictionary[borough] = []

    output_dictionary[borough].append(postcode)
    print("Added %s to %s" % (postcode, borough))

file.close()

print(output_dictionary)

with open('london_boroughs.json', 'w') as fp:
    json.dump(output_dictionary, fp)

fp.close()