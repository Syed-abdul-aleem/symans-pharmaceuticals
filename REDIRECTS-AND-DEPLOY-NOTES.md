# Symans Pharmaceuticals — Redesign: URL Mapping & Deploy Notes

The new site is a static, self-contained build (all images local). URL structure of the
original WordPress site is preserved by mapping — apply these 301 redirects on the host
when the new site replaces the old one on symans.com.pk:

| Original URL | New file |
|---|---|
| / | index.html |
| /about-us/ | about.html |
| /manufacturing/ | manufacturing.html |
| /certifications/ | certifications.html |
| /market-presence/ | market-presence.html |
| /global-marketplace/ | global-marketplace.html |
| /products/ and /shop/ | products.html |
| /product/{slug}/ | product/{slug}.html (all 117 products) |
| /product-category/{slug}/ | products.html?cat={slug} (therapeutic classes: products.html?ther={Name}) |
| /news-and-media/ | news.html |
| /{article-slug}/ | news/{article-slug}.html (3 articles) |
| /contact/ | contact.html |
| /privacy-policy/ | privacy-policy.html |
| /terms-conditions/ | terms-conditions.html |

Forms: contact & export forms validate in the browser and submit genuinely via the
visitor's email client to info@symans.com.pk (no fake success message). To switch to a
server-side form endpoint later, point the form handler in assets/app.js to the endpoint.

Certificates: the original site lists 5 certificate titles with no public scans.
Replace each card on certifications.html with the authentic scan once management provides it.
