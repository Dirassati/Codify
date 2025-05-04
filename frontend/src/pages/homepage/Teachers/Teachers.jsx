import React from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import "./Teachers.css";

const experts = [
  { id: 1, img: "https://s3-alpha-sig.figma.com/img/221b/7e3a/6874f6ad6cc31d849fce5c3489d88d9e?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=lDcbQp3DMqhm2YjjtcENk7NsKJoH~O6SxAZPHlYQggaALaYQoYCBIf-UpVlxYfZihvp0PBX71SVNwvQfWQ790gU7r-KkN5qs8U9pVSHmWvWEK793dC9Jy1BAstbbxeZieXVb~WBw8MxFIFTkjQoMoa5tGnRjeomN6hyjnpEmNDBF1XFOH6n26vkgZwPK8koQyqCweXvg9-xu2QDebS0x5DFsiY61XP5JO5nZ~LI~BhZPF-4-h1hZ1hqaKDnKu-RnhRMrk-Tt5EnoZ5WbcWjLIZxoYuGSIYkXJin0lxR0YcQFFf9LE8xUwC94yFZOqCJTPyNkx7bop1HNJT7ULm9l8w__", name: "Julian Jameson", profession: "Profession",social_facebook:"",social_insta:"",social_x:"" },
  { id: 2, img: "https://s3-alpha-sig.figma.com/img/221b/7e3a/6874f6ad6cc31d849fce5c3489d88d9e?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=lDcbQp3DMqhm2YjjtcENk7NsKJoH~O6SxAZPHlYQggaALaYQoYCBIf-UpVlxYfZihvp0PBX71SVNwvQfWQ790gU7r-KkN5qs8U9pVSHmWvWEK793dC9Jy1BAstbbxeZieXVb~WBw8MxFIFTkjQoMoa5tGnRjeomN6hyjnpEmNDBF1XFOH6n26vkgZwPK8koQyqCweXvg9-xu2QDebS0x5DFsiY61XP5JO5nZ~LI~BhZPF-4-h1hZ1hqaKDnKu-RnhRMrk-Tt5EnoZ5WbcWjLIZxoYuGSIYkXJin0lxR0YcQFFf9LE8xUwC94yFZOqCJTPyNkx7bop1HNJT7ULm9l8w__", name: "Julian Jameson", profession: "Profession" ,social_facebook:"",social_insta:"",social_x:""},
  { id: 3, img: "https://s3-alpha-sig.figma.com/img/221b/7e3a/6874f6ad6cc31d849fce5c3489d88d9e?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=lDcbQp3DMqhm2YjjtcENk7NsKJoH~O6SxAZPHlYQggaALaYQoYCBIf-UpVlxYfZihvp0PBX71SVNwvQfWQ790gU7r-KkN5qs8U9pVSHmWvWEK793dC9Jy1BAstbbxeZieXVb~WBw8MxFIFTkjQoMoa5tGnRjeomN6hyjnpEmNDBF1XFOH6n26vkgZwPK8koQyqCweXvg9-xu2QDebS0x5DFsiY61XP5JO5nZ~LI~BhZPF-4-h1hZ1hqaKDnKu-RnhRMrk-Tt5EnoZ5WbcWjLIZxoYuGSIYkXJin0lxR0YcQFFf9LE8xUwC94yFZOqCJTPyNkx7bop1HNJT7ULm9l8w__", name: "Julian Jameson", profession: "Profession" ,social_facebook:"",social_insta:"",social_x:""},
  { id: 4, img: "https://s3-alpha-sig.figma.com/img/221b/7e3a/6874f6ad6cc31d849fce5c3489d88d9e?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=lDcbQp3DMqhm2YjjtcENk7NsKJoH~O6SxAZPHlYQggaALaYQoYCBIf-UpVlxYfZihvp0PBX71SVNwvQfWQ790gU7r-KkN5qs8U9pVSHmWvWEK793dC9Jy1BAstbbxeZieXVb~WBw8MxFIFTkjQoMoa5tGnRjeomN6hyjnpEmNDBF1XFOH6n26vkgZwPK8koQyqCweXvg9-xu2QDebS0x5DFsiY61XP5JO5nZ~LI~BhZPF-4-h1hZ1hqaKDnKu-RnhRMrk-Tt5EnoZ5WbcWjLIZxoYuGSIYkXJin0lxR0YcQFFf9LE8xUwC94yFZOqCJTPyNkx7bop1HNJT7ULm9l8w__", name: "Julian Jameson", profession: "Profession" ,social_facebook:"",social_insta:"",social_x:""},
  { id: 5, img: "https://s3-alpha-sig.figma.com/img/221b/7e3a/6874f6ad6cc31d849fce5c3489d88d9e?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=lDcbQp3DMqhm2YjjtcENk7NsKJoH~O6SxAZPHlYQggaALaYQoYCBIf-UpVlxYfZihvp0PBX71SVNwvQfWQ790gU7r-KkN5qs8U9pVSHmWvWEK793dC9Jy1BAstbbxeZieXVb~WBw8MxFIFTkjQoMoa5tGnRjeomN6hyjnpEmNDBF1XFOH6n26vkgZwPK8koQyqCweXvg9-xu2QDebS0x5DFsiY61XP5JO5nZ~LI~BhZPF-4-h1hZ1hqaKDnKu-RnhRMrk-Tt5EnoZ5WbcWjLIZxoYuGSIYkXJin0lxR0YcQFFf9LE8xUwC94yFZOqCJTPyNkx7bop1HNJT7ULm9l8w__", name: "Julian Jameson", profession: "Profession" ,social_facebook:"",social_insta:"",social_x:""},
  { id: 6, img: "https://s3-alpha-sig.figma.com/img/221b/7e3a/6874f6ad6cc31d849fce5c3489d88d9e?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=lDcbQp3DMqhm2YjjtcENk7NsKJoH~O6SxAZPHlYQggaALaYQoYCBIf-UpVlxYfZihvp0PBX71SVNwvQfWQ790gU7r-KkN5qs8U9pVSHmWvWEK793dC9Jy1BAstbbxeZieXVb~WBw8MxFIFTkjQoMoa5tGnRjeomN6hyjnpEmNDBF1XFOH6n26vkgZwPK8koQyqCweXvg9-xu2QDebS0x5DFsiY61XP5JO5nZ~LI~BhZPF-4-h1hZ1hqaKDnKu-RnhRMrk-Tt5EnoZ5WbcWjLIZxoYuGSIYkXJin0lxR0YcQFFf9LE8xUwC94yFZOqCJTPyNkx7bop1HNJT7ULm9l8w__", name: "Julian Jameson", profession: "Profession" ,social_facebook:"",social_insta:"",social_x:""},
  { id: 7, img: "https://s3-alpha-sig.figma.com/img/221b/7e3a/6874f6ad6cc31d849fce5c3489d88d9e?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=lDcbQp3DMqhm2YjjtcENk7NsKJoH~O6SxAZPHlYQggaALaYQoYCBIf-UpVlxYfZihvp0PBX71SVNwvQfWQ790gU7r-KkN5qs8U9pVSHmWvWEK793dC9Jy1BAstbbxeZieXVb~WBw8MxFIFTkjQoMoa5tGnRjeomN6hyjnpEmNDBF1XFOH6n26vkgZwPK8koQyqCweXvg9-xu2QDebS0x5DFsiY61XP5JO5nZ~LI~BhZPF-4-h1hZ1hqaKDnKu-RnhRMrk-Tt5EnoZ5WbcWjLIZxoYuGSIYkXJin0lxR0YcQFFf9LE8xUwC94yFZOqCJTPyNkx7bop1HNJT7ULm9l8w__", name: "Julian Jameson", profession: "Profession" ,social_facebook:"",social_insta:"",social_x:""},
  { id: 8, img: "https://s3-alpha-sig.figma.com/img/221b/7e3a/6874f6ad6cc31d849fce5c3489d88d9e?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=lDcbQp3DMqhm2YjjtcENk7NsKJoH~O6SxAZPHlYQggaALaYQoYCBIf-UpVlxYfZihvp0PBX71SVNwvQfWQ790gU7r-KkN5qs8U9pVSHmWvWEK793dC9Jy1BAstbbxeZieXVb~WBw8MxFIFTkjQoMoa5tGnRjeomN6hyjnpEmNDBF1XFOH6n26vkgZwPK8koQyqCweXvg9-xu2QDebS0x5DFsiY61XP5JO5nZ~LI~BhZPF-4-h1hZ1hqaKDnKu-RnhRMrk-Tt5EnoZ5WbcWjLIZxoYuGSIYkXJin0lxR0YcQFFf9LE8xUwC94yFZOqCJTPyNkx7bop1HNJT7ULm9l8w__", name: "Julian Jameson", profession: "Profession" ,social_facebook:"",social_insta:"",social_x:""},
];

const Teachers = () => {
  return (
    <div className="experts-container">
      <h2 className="title">Our Experts Teacher</h2>
      <div className="experts-grid">
        {experts.map((expert) => (
          <div className="expert-card" key={expert.id}>
            <img src={expert.img} alt={expert.name} className="expert-image" />
            <div className="expert-info">
              <h5 className="expert-name">{expert.name}</h5>
              <p className="expert-profession">{expert.profession}</p>
            </div>
            <div className="social-icons">
            <a href={experts.social_facebook} className="social-link"><i className="fab fa-facebook"></i></a>
              <a href={expert.social_insta} className="social-link"><i className="fab fa-instagram"></i></a>
              <a href={expert.social_x} className="social-link"><i className="fab fa-twitter"></i></a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teachers;
