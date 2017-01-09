# Imports
import pycurl
import StringIO

# Set to output
buf = StringIO.StringIO()
c = pycurl.Curl()
c.setopt(c.URL, "https://cloud.arest.io/7cg83u/mode/5/o")
c.setopt(c.WRITEFUNCTION, buf.write)
c.perform()
c.close()

print buf.getvalue()

# Write HIGH
buf = StringIO.StringIO()
c = pycurl.Curl()
c.setopt(c.URL, "https://cloud.arest.io/7cg83u/digital/5/0")
c.setopt(c.WRITEFUNCTION, buf.write)
c.perform()
c.close()

print buf.getvalue()