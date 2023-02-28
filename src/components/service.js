import request from "axios";

const server = "http://localhost:8080/";
export const updateOne = async (link, data) => {
  try {
    return await request.put(server + link, data);
  } catch (e) {
    const entity = link.replace(/\/.+/, "");
    if (e.response.status === 400) {
      const res = {};
      const messages = e.response.data.message;
      for (let message of messages) {
        const split = message.split(" ");
        const splitName = split[0].split(".");
        const name = splitName.length === 3 ? splitName[2] : splitName[0];
        split[0] = fieldNames[entity][name];
        res[name] = split.join(" ");
      }
      throw new Error(JSON.stringify(res));
    } else {
      e.message = e.response.data.message;
      throw e;
    }
  }
};

export const getOne = (link) => {
  return request.get(server + link);
};

export const getAll = (link, params = {}) => {
  return request.get(server + link, params);
};

export const deleteOne = (link) => {
  return request.delete(server + link);
};

export const createOne = async (link, data) => {
  try {
    return await request.post(server + link, data);
  } catch (e) {
    const entity = link.replace(/\/.+/, "");
    if (e.response.status === 400) {
      const res = {};
      const messages = e.response.data.message;
      for (let message of messages) {
        const split = message.split(" ");
        const splitName = split[0].split(".");
        const name = splitName.length === 3 ? splitName[2] : splitName[0];
        split[0] = fieldNames[entity][name];
        res[name] = split.join(" ");
      }
      throw new Error(JSON.stringify(res));
    } else {
      e.message = e.response.data.message;
      throw e;
    }
  }
};

const fieldNames = {
  department: {
    name: "Name",
    shortname: "Short name",
    faculty: "Faculty",
  },
  discipline: {
    name: "Name",
  },
  faculty: {
    name: "Name",
    shortname: "Short name",
  },
  group: {
    department: "Department",
    name: "Name",
    course: "Course",
  },
  schedule: {
    name: "Name",
    teacher: "Teacher",
    discipline: "Discipline",
    time: "Time",
    classroom: "Classroom",
  },
  student: {
    group: "Group",
    name: "Name",
    email: "Email",
    phone: "Phone",
  },
  teacher: {
    name: "Name",
    surname: "Surname",
    email: "Email",
    phone: "Phone",
  },
};
